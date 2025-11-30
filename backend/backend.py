from flask import Flask, request, jsonify,send_file
import psycopg2
import io

app = Flask(__name__)

DB_CONNECTION_PARAMS = {
    "dbname": "psb-stydy-db",
    "user": "postgre",
    "password": "PrialitPSB",
    "host": "localhost",
    "port": "5432"
}

@app.route("/api/theory-files-list", methods=["GET"])
def get_theory_files_list():
    with psycopg2.connect(**DB_CONNECTION_PARAMS) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, title FROM theory")
            rows = cur.fetchall()
            return jsonify([{"id": r[0], "title": r[1]} for r in rows])

@app.route("/api/homework-files-list", methods=["GET"])
def get_homework_files_list():
    with psycopg2.connect(**DB_CONNECTION_PARAMS) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT id, title FROM homeworks")
            rows = cur.fetchall()
            return jsonify([{"id": r[0], "title": r[1]} for r in rows])

@app.route("/api/get-theory-material/<int:theory_id>", methods=["GET"])
def get_theory_material(theory_id):
    with psycopg2.connect(**DB_CONNECTION_PARAMS) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT material_file FROM theory WHERE id = %s", (theory_id,))
            row = cur.fetchone()

            if row is None:
                return jsonify({"error": "Материал не найден."}), 404

            return send_file(io.BytesIO(row[0]), mimetype="application/octet-stream", download_name=f"theory_{theory_id}.bin")

@app.route("/api/get-homework-file/<int:homework_id>", methods=["GET"])
def get_homework_file(homework_id):
    with psycopg2.connect(**DB_CONNECTION_PARAMS) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT homework_file FROM homeworks WHERE id = %s", (homework_id,))
            row = cur.fetchone()

            if row is None:
                return jsonify({"error": "Домашнее задание не найдено."}), 404

            return send_file(io.BytesIO(row[0]), mimetype="application/octet-stream", download_name=f"homework_{homework_id}.bin")

@app.route("/api/upload-student-solution", methods=["POST"])
def upload_student_solution():
    if "file" not in request.files:
        return jsonify({"error": "Нет файла в запросе."}), 400

    file = request.files["file"]
    homework_id = request.form.get("homework_id")

    if file.filename == "" or homework_id is None:
        return jsonify({"error": "Имя файла или ID задания не указаны."}), 400

    data = file.read()

    with psycopg2.connect(**DB_CONNECTION_PARAMS) as conn:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE homeworks SET student_answer = %s WHERE id = %s",
                (bytes(data), homework_id)
            )

    return jsonify({"message": "Решение успешно загружено."})

if __name__ == "__main__":
    app.run(debug=True)