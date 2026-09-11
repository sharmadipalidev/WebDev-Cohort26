# Instagram Database Diagram

This repository contains the database schema design for an Instagram-like social media platform, focusing on user interactions, posts, stories, and follower relationships.

## Database Overview

The database is designed to support core Instagram features including user profiles, posts (with images/videos/reels), stories, bookmarks, comments, likes, and follower/following relationships.

## Database Diagram

![Instagram Database Diagram](InstagramFollowDB.png)

## Tables

### Users

Stores user account information and authentication details.

- `id`: Primary key, auto-incrementing serial
- `username`: Unique username (max 50 chars)
- `email`: Unique email address (max 100 chars)
- `phone`: Phone number (15 chars)
- `dob`: Date of birth
- `password`: Hashed password (256 chars)
- `bio`: User biography (text)
- `forgot_password_token`: Token for password reset
- `email_verification_token`: Token for email verification
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Posts

Contains user posts including images, videos, and reels.

- `id`: Primary key, auto-incrementing serial
- `caption`: Post caption (text)
- `image_url`: URL to post image (nullable)
- `video_url`: URL to post video (nullable)
- `reel_url`: URL to post reel (nullable)
- `author_id`: Foreign key to Users.id
- `created_at`: Post creation timestamp
- `updated_at`: Last update timestamp

### Stories

Stores temporary user stories (images/videos).

- `id`: Primary key, auto-incrementing serial
- `image_url`: URL to story image (nullable)
- `video_url`: URL to story video (nullable)
- `post_id`: Foreign key to Posts.id (nullable, for story-post links)
- `author_id`: Foreign key to Users.id
- `created_at`: Story creation timestamp
- `updated_at`: Last update timestamp

### Bookmarks

Tracks which posts users have bookmarked.

- `id`: Primary key, auto-incrementing serial
- `post_id`: Foreign key to Posts.id
- `author_id`: Foreign key to Users.id (user who bookmarked)
- `created_at`: Bookmark creation timestamp
- `updated_at`: Last update timestamp

### Account_Setting

User privacy and account settings.

- `id`: Primary key, auto-incrementing serial
- `user_id`: Foreign key to Users.id
- `is_account_private`: Boolean flag for private accounts
- `created_at`: Setting creation timestamp
- `updated_at`: Last update timestamp

### Comments

User comments on posts.

- `id`: Primary key, auto-incrementing serial
- `author_id`: Foreign key to Users.id (comment author)
- `post_id`: Foreign key to Posts.id
- `content`: Comment text
- `created_at`: Comment creation timestamp
- `updated_at`: Last update timestamp

### Likes

Tracks which posts users have liked.

- `id`: Primary key, auto-incrementing serial
- `author_id`: Foreign key to Users.id (user who liked)
- `post_id`: Foreign key to Posts.id
- `created_at`: Like creation timestamp
- `updated_at`: Last update timestamp

### Followers

Manages follower/following relationships between users.

- `id`: Primary key, auto-incrementing serial
- `user_id`: Foreign key to Users.id (the user being followed)
- `created_at`: Follow creation timestamp
- `updated_at`: Last update timestamp

## Relationships

- **Users** has one **Account_Setting** (one-to-one)
- **Users** has many **Posts** (one-to-many)
- **Users** has many **Stories** (one-to-many)
- **Users** has many **Bookmarks** (one-to-many)
- **Users** has many **Comments** (one-to-many, as author)
- **Users** has many **Likes** (one-to-many, as liker)
- **Users** has many **Followers** (one-to-many, as the followed user)
- **Posts** has many **Stories** (one-to-many, optional link)
- **Posts** has many **Bookmarks** (one-to-many)
- **Posts** has many **Comments** (one-to-many)
- **Posts** has many **Likes** (one-to-many)




