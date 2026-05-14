#### Redis Setup
```bash
docker run -d --name redis-server -p 6379:6379 redis
```
Or
```bash
version: '3.9'

services:
  redis:
    image: redis:latest
    container_name: redis-server
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

volumes:
  redis_data:
```