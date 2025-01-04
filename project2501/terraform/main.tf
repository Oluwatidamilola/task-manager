module "backend" {
  source = "./backend"

  region              = var.aws_region
  s3_bucket_name      = "dguru-terraform-state-dev"
  dynamodb_table_name = "terraform-state-locks-dev"
  environment         = "Development"
}

module "vpc" {
  source = "./modules/vpc"

  name            = "dev-vpc"
  cidr_block      = "10.0.0.0/16"
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]  # Replace with your actual public subnets
  private_subnets = ["10.0.3.0/24", "10.0.4.0/24"]  # Replace with your actual private subnets
  tags = {
    Project     = "Project2501"
    Environment = "Development"
  }
}

module "eks" {
  source  = "./modules/eks"

  cluster_name    = "eks-dev-cluster"
  cluster_version = "1.24"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    default = {
      min_size     = 1
      max_size     = 3
      desired_size = 2
      instance_type = "t3.medium"
    }
  }

  tags = var.tags
  environment = var.environment
}
