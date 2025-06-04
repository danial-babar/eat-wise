"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
// The Mongoose Schema definition using the IFoodItem interface
var FoodItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    barcode: { type: String, unique: true, sparse: true, trim: true }, // sparse allows multiple nulls if barcode is not present
    ingredients: [{ type: String, trim: true }],
    imageUrl: { type: String, trim: true },
    source: { type: String, required: true, trim: true }, // e.g., "Open Food Facts", "User Submission"
    tags: [{ type: String, trim: true, lowercase: true }],
    allergens: [{ type: String, trim: true, lowercase: true }],
    dietaryFlags: [{ type: String, trim: true, lowercase: true }],
    isSafeForDiabetics: { type: Boolean, default: false },
    isSafeDuringPregnancy: { type: Boolean, default: false },
    safetyScore: { type: Number, min: 0, max: 100 },
    userNotes: { type: String, trim: true },
}, { timestamps: true } // Automatically adds createdAt and updatedAt
);
// Indexing for faster searches
FoodItemSchema.index({ name: 'text', ingredients: 'text' });
FoodItemSchema.index({ barcode: 1 });
FoodItemSchema.index({ tags: 1 });
FoodItemSchema.index({ allergens: 1 });
// Prevent model recompilation in Next.js dev mode
var FoodItemModel = mongoose_1.models.FoodItem || mongoose_1.default.model('FoodItem', FoodItemSchema);
exports.default = FoodItemModel;
