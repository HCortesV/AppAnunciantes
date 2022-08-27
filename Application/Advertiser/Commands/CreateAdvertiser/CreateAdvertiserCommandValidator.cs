using FluentValidation;

namespace Application.Advertiser.Commands.CreateAdvertiser
{
    public class UpdateAdvertiserCommandValidator : AbstractValidator<CreateAdvertiserCommand>
    {
        public UpdateAdvertiserCommandValidator()
        {
            RuleFor(v => v.Rut)
                .NotEmpty()
                .WithMessage("Rut is required");

            RuleFor(v => v.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(20).WithMessage("Name should be 20 character max.");

            RuleFor(v=>v.Phone)
                .MinimumLength(10).WithMessage("Phone number should be at least 10 characters long")
                .MaximumLength(12).WithMessage("Phone number should be 12 character max.");
        }
    }
}
