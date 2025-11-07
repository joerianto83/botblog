<#
.SYNOPSIS
    Creates a new Hugo blog post from text input.

.DESCRIPTION
    This script generates a new Hugo blog post with proper frontmatter.
    It can accept text content, title, tags, and categories.

.PARAMETER Title
    The title of the blog post

.PARAMETER Content
    The content of the blog post (can be multiline)

.PARAMETER Tags
    Array of tags for the post

.PARAMETER Categories
    Array of categories for the post

.PARAMETER Draft
    Whether the post should be marked as draft (default: true)

.PARAMETER FilePath
    Optional custom file path. If not provided, will generate from title

.EXAMPLE
    .\New-BlogPost.ps1 -Title "My New Post" -Content "This is my content" -Tags @("Azure", "Cloud") -Categories @("Technology")

.EXAMPLE
    # Interactive mode
    .\New-BlogPost.ps1

.EXAMPLE
    # From clipboard
    $content = Get-Clipboard
    .\New-BlogPost.ps1 -Title "Post from Clipboard" -Content $content -Tags @("Notes") -Draft $false
#>

param(
  [Parameter(Mandatory = $false)]
  [string]$Title,

  [Parameter(Mandatory = $false)]
  [string]$Content,

  [Parameter(Mandatory = $false)]
  [string[]]$Tags = @(),

  [Parameter(Mandatory = $false)]
  [string[]]$Categories = @(),

  [Parameter(Mandatory = $false)]
  [bool]$Draft = $true,

  [Parameter(Mandatory = $false)]
  [string]$FilePath
)

# Get the script's directory and navigate to blog root
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$blogRoot = Split-Path -Parent $scriptDir
$postsDir = Join-Path $blogRoot 'content\posts'

# Create posts directory if it doesn't exist
if (!(Test-Path $postsDir)) {
  New-Item -ItemType Directory -Path $postsDir -Force | Out-Null
}

# Interactive mode if no parameters provided
if (-not $Title) {
  $Title = Read-Host 'Enter the blog post title'
}

if (-not $Content) {
  Write-Host "`nEnter the blog post content (press Ctrl+Z and Enter when done):" -ForegroundColor Cyan
  $Content = $input | Out-String
}

if ($Tags.Count -eq 0) {
  $tagsInput = Read-Host 'Enter tags (comma-separated, or press Enter to skip)'
  if ($tagsInput) {
    $Tags = $tagsInput -split ',' | ForEach-Object { $_.Trim() }
  }
}

if ($Categories.Count -eq 0) {
  $categoriesInput = Read-Host 'Enter categories (comma-separated, or press Enter to skip)'
  if ($categoriesInput) {
    $Categories = $categoriesInput -split ',' | ForEach-Object { $_.Trim() }
  }
}

# Generate filename from title if not provided
if (-not $FilePath) {
  $slug = $Title.ToLower() -replace '[^a-z0-9\s-]', '' -replace '\s+', '-'
  $FilePath = Join-Path $postsDir "$slug.md"
}
else {
  $FilePath = Join-Path $postsDir $FilePath
}

# Get current date in ISO format
$date = Get-Date -Format 'yyyy-MM-ddTHH:mm:sszzz'

# Build frontmatter
$frontmatter = @"
---
title: "$Title"
date: $date
draft: $($Draft.ToString().ToLower())
"@

if ($Tags.Count -gt 0) {
  $frontmatter += "`ntags: ["
  $frontmatter += ($Tags | ForEach-Object { "`"$_`"" }) -join ', '
  $frontmatter += ']'
}

if ($Categories.Count -gt 0) {
  $frontmatter += "`ncategories: ["
  $frontmatter += ($Categories | ForEach-Object { "`"$_`"" }) -join ', '
  $frontmatter += ']'
}

$frontmatter += "`n---`n"

# Combine frontmatter and content
$fullContent = $frontmatter + "`n" + $Content

# Write to file
$fullContent | Out-File -FilePath $FilePath -Encoding UTF8

Write-Host "`n✅ Blog post created successfully!" -ForegroundColor Green
Write-Host "📄 File: $FilePath" -ForegroundColor Cyan
Write-Host "📝 Title: $Title" -ForegroundColor Cyan

if ($Draft) {
  Write-Host "📋 Status: Draft (set -Draft `$false to publish)" -ForegroundColor Yellow
}
else {
  Write-Host '🚀 Status: Published' -ForegroundColor Green
}

# Ask if user wants to open the file
$open = Read-Host "`nOpen the file in VS Code? (Y/n)"
if ($open -ne 'n') {
  code $FilePath
}
