pipeline {
    agent any
    
    stages {
        stage('Checkout Source Code') {
            steps {
                // Tự động kéo mã nguồn từ GitHub về
                checkout scm
            }
        }
        
        stage('SonarQube Code Analysis') {
            steps {
                script {
                    // Lấy biến từ Credentials của Jenkins
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN'),
                                    string(credentialsId: 'sonar-host-ip', variable: 'SONAR_IP')]) {
                        sh '''
                        docker run --rm \
                            -e SONAR_HOST_URL="http://${SONAR_IP}:9000" \
                            -e SONAR_TOKEN="${SONAR_TOKEN}" \
                            -v "$(pwd):/usr/src" \
                            sonarsource/sonar-scanner-cli
                        '''
                    }
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Đóng gói ứng dụng thành Docker Image
                sh 'docker build -t lab2-microservice:latest .'
            }
        }
        
        stage('Deploy to Production') {
            steps {
                // Xóa container cũ và chạy container mới ở port 3000
                sh '''
                docker rm -f lab2-app || true
                docker run -d -p 3000:3000 --name lab2-app lab2-microservice:latest
                '''
            }
        }
    }
}