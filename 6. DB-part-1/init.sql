CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Users (
    ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Name VARCHAR(100),
    Email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS UserPreferences (
	PreferenceID SERIAL PRIMARY KEY,
	LanguageCode VARCHAR(100),
	PreferredCommunication INT,
    UserId UUID,
	FOREIGN KEY (UserId) REFERENCES Users(ID) ON DELETE CASCADE
)

-- ALTER TABLE users ADD UNIQUE (name)
-- ALTER TABLE users ALTER COLUMN name SET NOT NULL;