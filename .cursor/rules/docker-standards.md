# Docker Standards

## Overview
Standards for building Docker images with Artifactory integration for secure package management.

## Artifactory Integration

### Credential Management
Always use Artifactory credentials from the local pip configuration file to enable Docker builds to download packages from Artifactory.

### Credential Location
Credentials are stored in:
- `.venv/pip.ini` (preferred)
- `venv/pip.ini` (fallback)

### Implementation

#### Dockerfile Build Arguments
Always pass Artifactory credentials as build arguments to enable package downloads during image build.

```dockerfile
# Dockerfile
FROM python:3.11-slim

# Accept Artifactory credentials as build arguments
ARG ARTIFACTORY_USER
ARG ARTIFACTORY_TOKEN
ARG ARTIFACTORY_URL

# Configure pip to use Artifactory
RUN pip config set global.index-url https://${ARTIFACTORY_USER}:${ARTIFACTORY_TOKEN}@${ARTIFACTORY_URL}/artifactory/api/pypi/pypi/simple
RUN pip config set global.trusted-host ${ARTIFACTORY_URL}

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . /app
WORKDIR /app

CMD ["python", "app.py"]
```

#### Build Command Example

```bash
# Extract credentials from pip.ini
ARTIFACTORY_USER=$(grep -A 1 '\[global\]' .venv/pip.ini | grep 'username' | cut -d'=' -f2 | xargs)
ARTIFACTORY_TOKEN=$(grep -A 1 '\[global\]' .venv/pip.ini | grep 'password' | cut -d'=' -f2 | xargs)
ARTIFACTORY_URL="acadartifactory.jfrog.io"

# Build Docker image with Artifactory credentials
docker build \
  --build-arg ARTIFACTORY_USER="${ARTIFACTORY_USER}" \
  --build-arg ARTIFACTORY_TOKEN="${ARTIFACTORY_TOKEN}" \
  --build-arg ARTIFACTORY_URL="${ARTIFACTORY_URL}" \
  -t myapp:latest .
```

### pip.ini Format

Expected format of `.venv/pip.ini`:

```ini
[global]
index-url = https://acadartifactory.jfrog.io/artifactory/api/pypi/pypi/simple
trusted-host = acadartifactory.jfrog.io
username = your-username
password = your-token-or-password
```

## Best Practices

### Multi-Stage Builds
Use multi-stage builds to reduce final image size and exclude build dependencies.

```dockerfile
# Build stage
FROM python:3.11-slim AS builder

ARG ARTIFACTORY_USER
ARG ARTIFACTORY_TOKEN
ARG ARTIFACTORY_URL

RUN pip config set global.index-url https://${ARTIFACTORY_USER}:${ARTIFACTORY_TOKEN}@${ARTIFACTORY_URL}/artifactory/api/pypi/pypi/simple

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.11-slim

COPY --from=builder /root/.local /root/.local
COPY . /app
WORKDIR /app

ENV PATH=/root/.local/bin:$PATH

CMD ["python", "app.py"]
```

### Security Considerations

1. **Never commit credentials** to version control
2. **Use .dockerignore** to exclude sensitive files
3. **Don't expose credentials** in environment variables in final image
4. **Use build-time arguments** (not ENV) for credentials
5. **Validate credentials** are not present in final image layers

### .dockerignore Example

```
.venv/
venv/
*.pyc
__pycache__/
.git/
.gitignore
*.md
.env
pip.ini
.pytest_cache/
```

### Image Optimization

1. Use official base images
2. Combine RUN commands to reduce layers
3. Use `--no-cache-dir` with pip to reduce image size
4. Clean up package manager caches
5. Use multi-stage builds for compiled languages

```dockerfile
# Example: Optimized layer
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y gcc && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*
```

## Docker Compose Integration

When using Docker Compose, pass build arguments from environment or files.

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      args:
        ARTIFACTORY_USER: ${ARTIFACTORY_USER}
        ARTIFACTORY_TOKEN: ${ARTIFACTORY_TOKEN}
        ARTIFACTORY_URL: ${ARTIFACTORY_URL:-acadartifactory.jfrog.io}
    ports:
      - "8000:8000"
```

Load credentials from file before running:

```bash
# Load credentials from pip.ini
export ARTIFACTORY_USER=$(grep 'username' .venv/pip.ini | cut -d'=' -f2 | xargs)
export ARTIFACTORY_TOKEN=$(grep 'password' .venv/pip.ini | cut -d'=' -f2 | xargs)

# Build and run
docker-compose up --build
```

## Validation Checklist

Before building Docker images:
- [ ] Artifactory credentials properly extracted from pip.ini
- [ ] Build arguments correctly passed to Docker build
- [ ] Credentials not exposed in final image layers
- [ ] .dockerignore excludes sensitive files
- [ ] Image builds successfully with Artifactory packages
- [ ] Final image size optimized
- [ ] No credentials in environment variables of running container

## Troubleshooting

### Common Issues

**Issue:** pip cannot download packages during build
```
Solution: Verify build arguments are passed correctly and credentials are valid
```

**Issue:** Credentials file not found
```
Solution: Ensure .venv/pip.ini or venv/pip.ini exists with proper format
```

**Issue:** SSL certificate verification fails
```
Solution: Add trusted-host configuration or install CA certificates
```

---

**Last Updated:** 2025-11-07  
**Version:** 1.0

