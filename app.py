from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)
db = sqlite3.connect('database.db')
cursor = db.cursor()


cursor.execute('''
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        context TEXT,
        question TEXT,
        system TEXT,
        rater_id TEXT,
        rank INTEGER
    )
''')
db.commit()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_feedback', methods=['POST'])
def submit_feedback():
    context = request.form['context']
    question = request.form['question']
    system = request.form['system']
    rater_id = request.form['rater_id']
    rank = request.form['rank']
    
    
    cursor.execute('''
        INSERT INTO feedback (context, question, system, rater_id, rank)
        VALUES (?, ?, ?, ?, ?)
    ''', (context, question, system, rater_id, rank))
    db.commit()
    
    return 'Feedback submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)
