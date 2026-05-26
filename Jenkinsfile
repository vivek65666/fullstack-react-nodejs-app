pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'your-dockerhub-username' // 👈 Replace with your Docker Hub username
        FRONTEND_IMAGE  = 'my-vite-frontend'
        BACKEND_IMAGE   = 'my-node-backend'
        IMAGE_TAG       = "${BUILD_NUMBER}" 
        REGISTRY_CRED   = 'docker-hub-credentials' // Jenkins Credentials ID
    }
    
    stages {
        stage('🔄 Checkout') {
            steps {
                checkout scm
            }
        }

        stage('📦 Build Production Images') {
            steps {
                echo 'Building production Docker images...'
                script {
                    frontendImg = docker.build("${DOCKER_HUB_USER}/${FRONTEND_IMAGE}:${IMAGE_TAG}", "-f frontend/Dockerfile ./frontend")
                    backendImg  = docker.build("${DOCKER_HUB_USER}/${BACKEND_IMAGE}:${IMAGE_TAG}", "-f backend/Dockerfile ./backend")
                }
            }
        }

        stage('🚀 Push to Docker Hub') {
            steps {
                echo 'Logging into Docker Hub and pushing images...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CRED) {
                        frontendImg.push()
                        frontendImg.push("latest")
                        backendImg.push()
                        backendImg.push("latest")
                    }
                }
            }
        }

        stage('🌐 Deploy to Server') {
            steps {
                echo 'Deploying to Production Server via SSH...'
                sshagent(credentials: ['ssh-production-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@your-server-ip << 'EOF'
                        cd /app/deployment
                        export TAG=${IMAGE_TAG}
                        docker compose pull
                        docker compose up -d --remove-orphans
                        docker image prune -f
                    EOF
                    """
                }
            }
        }
    }
}