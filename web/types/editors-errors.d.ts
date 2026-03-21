// Global error returned by CreateArticle/EditArticle -> ArticleState
type ArticleStateErrors = {
  title?: FieldError;
  subtitle?: FieldError;
  profileId?: FieldError;
  body?: {
    errors: string[];
    items?: BodyItemError[];
  };
};

// Body
type BodyItemError = {
  errors: string[];
  properties?: BlockPropertyErrors;
};

// Properties
type BlockPropertyErrors = {
  id?: FieldError;
  type?: FieldError;
  locked?: FieldError;
  data?: {
    errors: string[];
    properties?: BlockDataErrors;
  };
};

// Blocks error structure (polymorphic)
type BlockDataErrors = {
  body?: FieldError; // HTML
  code?: FieldError; // Code
  language?: FieldError; // Code
  filename?: FieldError; // Code
  url?: FieldError; // Image
  alt?: FieldError; // Image
};

// FieldError
type FieldError = {
  errors: string[];
};
