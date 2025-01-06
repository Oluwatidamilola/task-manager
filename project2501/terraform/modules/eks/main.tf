# EKS Cluster using Terraform AWS Modules
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  # Cluster configuration
  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version
  vpc_id          = var.vpc_id
  subnet_ids      = var.subnet_ids

  # Managed Node Groups
  eks_managed_node_groups = var.eks_managed_node_groups

  # Fargate Profiles (if using Fargate)
  fargate_profiles = var.fargate_profiles

  # Logging
  cluster_enabled_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]

  # Tags
  tags = merge(
    var.tags,
    {
      "Name"        = "${var.cluster_name}-eks-cluster",
      "Environment" = var.environment
    }
  )
}

# Security Group for the EKS Cluster
resource "aws_security_group" "eks_cluster" {
  vpc_id      = var.vpc_id
  description = "EKS cluster security group"

  # Ingress rules
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.allowed_ingress_cidr_blocks
  }

  # Egress rules
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Tags
  tags = merge(
    var.tags,
    {
      "Name"        = "${var.cluster_name}-eks-sg",
      "Environment" = var.environment
    }
  )
}

# IAM Roles for Service Accounts (IRSA) Configuration
module "irsa" {
  source               = "../irsa"

  cluster_name         = module.eks.cluster_name
  namespace            = var.irsa_namespace
  service_account_name = var.irsa_service_account_name
  policy_json          = file("${path.module}/policy.json") # Path to the IAM policy JSON file

  tags = var.tags
}
