export function fullNameAndInitials(
  names: { firstName: string; lastName: string } = {
    firstName: '',
    lastName: '',
  },
): {
  fullName: string;
  initials: string;
} {
  const { firstName, lastName } = names;

  const fullName = `${firstName} ${lastName}`.trim();

  let initials = '';

  if (firstName && lastName) {
    initials = firstName[0].toUpperCase() + lastName[0].toUpperCase();
  } else if (firstName) {
    initials = firstName.slice(0, 2).toUpperCase();
  } else if (lastName) {
    initials = lastName.slice(0, 2).toUpperCase();
  }

  return { fullName, initials };
}
