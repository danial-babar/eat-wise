import mongoose, { Schema, Document, models, Model, Types } from 'mongoose';

export interface IBlogArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: Types.ObjectId; // Reference to User model
  category?: string;
  tags?: string[];
  status: 'draft' | 'published';
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogArticleSchema: Schema<IBlogArticle> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    content: { type: String, required: true },
    excerpt: { type: String, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, trim: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    featuredImage: { type: String, trim: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexing for faster queries
BlogArticleSchema.index({ slug: 1 });
BlogArticleSchema.index({ status: 1, category: 1 });
BlogArticleSchema.index({ tags: 1 });
BlogArticleSchema.index({ author: 1 });

// TODO: Consider adding a pre-save hook to auto-generate slug from title if not provided
// For example, using a library like 'slugify'
// BlogArticleSchema.pre('save', function(next) {
//   if (!this.slug && this.isModified('title')) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   next();
// });

const BlogArticle: Model<IBlogArticle> = 
  models.BlogArticle || mongoose.model<IBlogArticle>('BlogArticle', BlogArticleSchema);

export default BlogArticle;
