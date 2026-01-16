/*
  # Create Portfolio Schema

  1. New Tables
    - `profile`
      - `id` (uuid, primary key)
      - `name` (text) - Full name
      - `title` (text) - Professional title
      - `bio` (text) - Short biography
      - `email` (text) - Contact email
      - `location` (text) - Current location
      - `avatar_url` (text) - Profile picture URL
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `education`
      - `id` (uuid, primary key)
      - `institution` (text) - School/University name
      - `degree` (text) - Degree type (e.g., Bachelor's, Master's)
      - `field` (text) - Field of study
      - `start_date` (text) - Start date
      - `end_date` (text) - End date (or "Present")
      - `description` (text) - Additional details
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text) - Project name
      - `description` (text) - Project description
      - `technologies` (text array) - Technologies used
      - `url` (text) - Project URL (optional)
      - `github_url` (text) - GitHub repository URL (optional)
      - `image_url` (text) - Project image (optional)
      - `start_date` (text) - Start date
      - `end_date` (text) - End date (or "Present")
      - `featured` (boolean) - Whether to feature this project
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `awards`
      - `id` (uuid, primary key)
      - `title` (text) - Award name
      - `issuer` (text) - Organization that issued the award
      - `date` (text) - Date received
      - `description` (text) - Award details
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `publications`
      - `id` (uuid, primary key)
      - `title` (text) - Publication title
      - `authors` (text) - List of authors
      - `venue` (text) - Journal/Conference name
      - `date` (text) - Publication date
      - `url` (text) - Publication URL (optional)
      - `doi` (text) - DOI (optional)
      - `abstract` (text) - Publication abstract
      - `sort_order` (integer) - Display order
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (portfolio is public)
    - Add policies for authenticated admin access for updates
*/

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  degree text NOT NULL,
  field text NOT NULL,
  start_date text NOT NULL,
  end_date text NOT NULL,
  description text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  url text DEFAULT '',
  github_url text DEFAULT '',
  image_url text DEFAULT '',
  start_date text NOT NULL,
  end_date text NOT NULL,
  featured boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create awards table
CREATE TABLE IF NOT EXISTS awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text NOT NULL,
  date text NOT NULL,
  description text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  authors text NOT NULL,
  venue text NOT NULL,
  date text NOT NULL,
  url text DEFAULT '',
  doi text DEFAULT '',
  abstract text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view profile"
  ON profile FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view education"
  ON education FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view awards"
  ON awards FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view publications"
  ON publications FOR SELECT
  TO anon
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can insert profile"
  ON profile FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update profile"
  ON profile FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert education"
  ON education FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update education"
  ON education FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete education"
  ON education FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert awards"
  ON awards FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update awards"
  ON awards FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete awards"
  ON awards FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert publications"
  ON publications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update publications"
  ON publications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete publications"
  ON publications FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS education_sort_order_idx ON education(sort_order);
CREATE INDEX IF NOT EXISTS projects_sort_order_idx ON projects(sort_order);
CREATE INDEX IF NOT EXISTS projects_featured_idx ON projects(featured);
CREATE INDEX IF NOT EXISTS awards_sort_order_idx ON awards(sort_order);
CREATE INDEX IF NOT EXISTS publications_sort_order_idx ON publications(sort_order);