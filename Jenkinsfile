pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'vivek65666' // 👈 Your actual Docker Hub username
        FRONTEND_IMAGE  = 'my-vite-frontend'
        BACKEND_IMAGE   = 'my-node-backend'
        IMAGE_TAG       = "${BUILD_NUMBER}" 
        REGISTRY_CRED   = 'docker-hub-credentials'
    }
    
    stages {
        stage('🔄 Checkout') {
            steps {
                checkout scm
            }
        }

        stage('📦 Build Production Images') {
            steps {
                echo 'Building production Docker images using Jenkins plugin...'
                script {
                    // The native plugin syntax automatically resolves npipe on Windows safely!
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
    }
}