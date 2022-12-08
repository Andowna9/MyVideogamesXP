FROM python:3.8

WORKDIR /usr/src/app

COPY requirements.txt ./requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY . .

EXPOSE 4000

CMD ["uvicorn", "src.app:app", "--host", "0.0.0.0", "--port", "4000"]