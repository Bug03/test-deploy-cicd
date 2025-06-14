#!/bin/bash

# Git Flow Helper Scripts
# Thêm execute permission: chmod +x scripts/git-flow.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "Not in a Git repository"
        exit 1
    fi
}

# Start new feature
start_feature() {
    if [ -z "$1" ]; then
        log_error "Feature name required. Usage: ./git-flow.sh feature <feature-name>"
        exit 1
    fi
    
    local feature_name="$1"
    local branch_name="feature/$feature_name"
    
    log_info "Starting new feature: $feature_name"
    
    # Sync with develop
    git checkout develop
    git pull origin develop
    
    # Create feature branch
    git checkout -b "$branch_name"
    
    log_success "Feature branch '$branch_name' created and checked out"
    log_info "You can now start working on your feature"
    log_info "Remember to commit using conventional commits:"
    log_info "  git commit -m 'feat(scope): description'"
}

# Finish feature
finish_feature() {
    local current_branch=$(git branch --show-current)
    
    if [[ $current_branch != feature/* ]]; then
        log_error "Not on a feature branch. Current branch: $current_branch"
        exit 1
    fi
    
    log_info "Finishing feature: $current_branch"
    
    # Push feature branch
    git push origin "$current_branch"
    
    log_success "Feature branch pushed to origin"
    log_info "Create a Pull Request from $current_branch to develop"
    log_info "After PR is merged, run: ./git-flow.sh cleanup-feature"
}

# Cleanup after feature merge
cleanup_feature() {
    local current_branch=$(git branch --show-current)
    
    if [[ $current_branch == feature/* ]]; then
        # Switch to develop first
        git checkout develop
        git pull origin develop
        
        # Delete local feature branch
        git branch -d "$current_branch"
        
        log_success "Feature branch '$current_branch' deleted locally"
    else
        log_warning "Not on a feature branch, skipping cleanup"
    fi
}

# Start hotfix
start_hotfix() {
    if [ -z "$1" ]; then
        log_error "Hotfix version required. Usage: ./git-flow.sh hotfix <version>"
        exit 1
    fi
    
    local version="$1"
    local branch_name="hotfix/$version"
    
    log_info "Starting hotfix: $version"
    
    # Sync with main
    git checkout main
    git pull origin main
    
    # Create hotfix branch
    git checkout -b "$branch_name"
    
    log_success "Hotfix branch '$branch_name' created and checked out"
}

# Start release
start_release() {
    if [ -z "$1" ]; then
        log_error "Release version required. Usage: ./git-flow.sh release <version>"
        exit 1
    fi
    
    local version="$1"
    local branch_name="release/$version"
    
    log_info "Starting release: $version"
    
    # Sync with develop
    git checkout develop
    git pull origin develop
    
    # Create release branch
    git checkout -b "$branch_name"
    
    log_success "Release branch '$branch_name' created and checked out"
    log_info "Update version in package.json and create changelog"
}

# Show current status
status() {
    local current_branch=$(git branch --show-current)
    local git_status=$(git status --porcelain)
    
    echo "=================== GIT FLOW STATUS ==================="
    echo "Current branch: $current_branch"
    echo "Branch type: $(get_branch_type $current_branch)"
    echo ""
    
    if [ -n "$git_status" ]; then
        log_warning "Uncommitted changes:"
        git status --short
    else
        log_success "Working directory clean"
    fi
    
    echo ""
    echo "Recent commits:"
    git log --oneline -5
}

# Get branch type
get_branch_type() {
    local branch="$1"
    case $branch in
        main)           echo "Production" ;;
        develop)        echo "Development" ;;
        feature/*)      echo "Feature" ;;
        release/*)      echo "Release" ;;
        hotfix/*)       echo "Hotfix" ;;
        *)              echo "Other" ;;
    esac
}

# List commands
help() {
    echo "Git Flow Helper Commands:"
    echo ""
    echo "  feature <name>    - Start new feature branch"
    echo "  finish           - Finish current feature branch"
    echo "  cleanup          - Cleanup after feature merge"
    echo "  release <version> - Start release branch"
    echo "  hotfix <version>  - Start hotfix branch" 
    echo "  status           - Show current git flow status"
    echo "  help             - Show this help"
    echo ""
    echo "Examples:"
    echo "  ./git-flow.sh feature user-authentication"
    echo "  ./git-flow.sh release v1.2.0"
    echo "  ./git-flow.sh hotfix v1.1.1"
}

# Main script
main() {
    check_git_repo
    
    case "${1:-help}" in
        feature)        start_feature "$2" ;;
        finish)         finish_feature ;;
        cleanup)        cleanup_feature ;;
        release)        start_release "$2" ;;
        hotfix)         start_hotfix "$2" ;;
        status)         status ;;
        help)           help ;;
        *)              log_error "Unknown command: $1"; help; exit 1 ;;
    esac
}

main "$@"
