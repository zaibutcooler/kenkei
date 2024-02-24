# Use official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends netcat gcc \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /usr/src/app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app
COPY . /usr/src/app

# Run the FastAPI application with Gunicorn in production mode
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-c", "gunicorn_config.py", "main:app"]
