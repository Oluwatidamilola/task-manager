resource "aws_security_group" "this" {
  depends_on = [aws_vpc.main] # Ensure the VPC is fully created before this SG

  description = "EKS managed node group security group"
  vpc_id      = aws_vpc.main.id
  ...
}
