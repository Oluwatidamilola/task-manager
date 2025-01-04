# EKS Cluster Module Configuration

# EKS Cluster using Terraform AWS Modules
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version
  vpc_id          = var.vpc_id
  subnet_ids      = var.subnet_ids

  eks_managed_node_groups = var.eks_managed_node_groups

  tags = var.tags
}

# Security Group for EKS Cluster
resource "aws_security_group" "cluster" {
  vpc_id      = var.vpc_id
  description = "EKS cluster security group"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name        = "eks-cluster-sg"
      Environment = var.environment
    }
  )
}

# IRSA Configuration (IAM Roles for Service Accounts)
module "irsa" {
  source               = "./irsa" # Path to the IRSA module
  cluster_name         = module.eks.cluster_name
  namespace            = "kube-system"                    # Replace with your namespace
  service_account_name = "example-service-account"        # Replace with your service account name
  policy_json          = file("${path.module}/policy.json") # Path to your IAM policy JSON
  tags                 = var.tags
}
