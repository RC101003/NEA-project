import csv
import sqlite3

# Open CSV file and SQLite database
with open('footballers.csv', newline='') as csvfile, sqlite3.connect('football.db') as conn:
    # Create table if it doesn't exist
    conn.execute('''
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            goals INTEGER NOT NULL,
            penalties INTEGER NOT NULL,
            cards INTEGER NOT NULL,
            team TEXT NOT NULL
        );
    ''')

    # Read CSV data and insert or replace into database
    reader = csv.reader(csvfile)
    next(reader)  # skip header row

    for row in reader:
        name = row[1]
        try:
            goals = int(row[2])
        except ValueError:
            goals = 0
        try:
            penalties = int(row[3])
        except ValueError:
            penalties = 0
        try:
            cards = int(row[5])
        except ValueError:
            cards = 0
        team = row[7]

        conn.execute('INSERT OR REPLACE INTO players (name, goals, penalties, cards, team) VALUES (?, ?, ?, ?, ?)', (name, goals, penalties, cards, team))

    # Commit changes to database
    conn.commit()
