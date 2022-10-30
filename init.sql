DELETE FROM users;
INSERT INTO users (
        id,
        username,
        password,
        role,
        createdAt,
        updatedAt
    )
VALUES (
        'fd6644f8-f987-4da4-93c3-8b25e3a37f62',
        'aimsteacher',
        '$2a$10$2kBni7vfh7NpShLy/jlY/uCD08BpTlWivJNvQtuFI2sC/uwmAel42',
        'teacher',
        '2022-10-24 12:38:51',
        '2022-10-24 12:38:51'
    ),
    (
        'fd6644f8-f987-4da4-93c3-8b25e3a37f63',
        'aimsstudent',
        '$2a$10$2kBni7vfh7NpShLy/jlY/uCD08BpTlWivJNvQtuFI2sC/uwmAel42',
        'student',
        '2022-10-24 12:38:51',
        '2022-10-24 12:38:51'
    ),
    (
        'fd6644f8-f987-4da4-93c3-8b25e3a37f64',
        'teststudentuno',
        '$2a$10$2kBni7vfh7NpShLy/jlY/uCD08BpTlWivJNvQtuFI2sC/uwmAel42',
        'student',
        '2022-10-24 12:38:51',
        '2022-10-24 12:38:51'
    ),
    (
        'fd6644f8-f987-4da4-93c3-8b25e3a37f65',
        'teststudentdos',
        '$2a$10$2kBni7vfh7NpShLy/jlY/uCD08BpTlWivJNvQtuFI2sC/uwmAel42',
        'student',
        '2022-10-24 12:38:51',
        '2022-10-24 12:38:51'
    );