from flask import Flask, render_template
import sqlite3


app = Flask(__name__)

@app.route('/squad-selection')
def squad_selection():
    # Connect to the database
    conn = sqlite3.connect('football.db')
    c = conn.cursor()

    # Retrieve player data from the database
    c.execute("SELECT name, position, goals, assists, club FROM players")

    # Store the player data in a list of dictionaries
    players = []
    for row in c.fetchall():
        player = {'name': row[0], 'position': row[1], 'goals': row[2], 'assists': row[3], 'club': row[4]}
        players.append(player)

    # Close the database connection
    conn.close()

    # Render the squad selection template and pass the player data to it
    return render_template('squad_selection.html', players=players)
