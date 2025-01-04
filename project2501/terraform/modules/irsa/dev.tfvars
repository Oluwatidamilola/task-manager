cluster_name         = "eks-dev-cluster"
namespace            = "kube-system"
service_account_name = "example-service-account"
policy_json          = "policy.json"
tags = {
  Environment = "Development"
  Project     = "Project2501"
}
