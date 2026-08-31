CREATE TABLE IF NOT EXISTS categories
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS attributes
(
    id        INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(100)                    NOT NULL UNIQUE,
    data_type ENUM ('text', 'number', 'date') NOT NULL
);

CREATE TABLE IF NOT EXISTS category_attributes
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    category_id  INT NOT NULL,
    attribute_id INT NOT NULL,
    required     BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes (id) ON DELETE CASCADE,
    UNIQUE KEY unique_category_attribute (category_id, attribute_id)
);

CREATE TABLE IF NOT EXISTS items
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    category_id INT          NOT NULL,
    description TEXT,
    image       VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
    UNIQUE KEY unique_item_category (name, category_id)
);

CREATE TABLE IF NOT EXISTS item_attribute_values
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    item_id      INT NOT NULL,
    attribute_id INT NOT NULL,
    value        TEXT,
    FOREIGN KEY (item_id) REFERENCES items (id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes (id) ON DELETE CASCADE
);