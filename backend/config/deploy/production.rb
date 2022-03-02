server "54.180.91.136", user: "ubuntu", roles: %w[app db web]

set :deploy_to, "/home/#{fetch(:user)}/#{fetch(:application)}"
# set :stage, :production
## SSH Remote 설정 (서버 아이디 및 pem Key 경로 설정)
set :ssh_options, { forward_agent: true, user: fetch(:user), keys: %w(/Users/apple/Desktop/programming/deploy_keys/tiltil-key.pem) }