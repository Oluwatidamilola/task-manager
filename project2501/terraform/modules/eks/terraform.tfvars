# General cluster configuration
name            = "my-eks-cluster"
cluster_version = "1.24"

# Networking configuration
vpc_id     = "vpc-08a96fcd44d8b46c7" # Replace with your VPC ID if VPC module is unused
subnet_ids = ["subnet-059037bcd3355d1e2", "subnet-01294d8a89193ac14"] # Replace with your subnet IDs

# Tags
tags = {
  Environment = "dev"
  Project     = "project2501"
}

# Node group configuration
eks_managed_node_groups = {
  default = {
    name            = "default-node-group"
    desired_capacity = 2
    min_size         = 1
    max_size         = 3
    instance_types   = ["t3.medium"]
    tags = {
      Environment = "dev"
    }
  }
}

# AWS configuration
aws_region  = "ap-northeast-1" # Replace with your desired region
aws_profile = "AdministratorAccess-588577234645" # Replace with your profile name
