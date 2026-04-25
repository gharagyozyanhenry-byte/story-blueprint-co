alter table public.contact_submissions
  add constraint contact_submissions_name_len check (char_length(name) between 1 and 120),
  add constraint contact_submissions_email_len check (char_length(email) between 3 and 255),
  add constraint contact_submissions_phone_len check (phone is null or char_length(phone) <= 40),
  add constraint contact_submissions_subject_len check (subject_area is null or char_length(subject_area) <= 80),
  add constraint contact_submissions_message_len check (char_length(message) between 1 and 5000);