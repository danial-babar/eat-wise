"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var FoodItem_1 = __importDefault(require("../src/models/FoodItem")); // Adjust path as necessary
// Load environment variables from .env file
dotenv_1.default.config({ path: './.env' }); // Ensure .env is at the root or adjust path
var dummyFoodItems = [
    {
        name: 'Chicken Salad Sandwich',
        barcode: '000000000001',
        ingredients: ['Whole Wheat Bread', 'Cooked Chicken Breast', 'Mayonnaise', 'Celery', 'Lettuce', 'Salt', 'Black Pepper'],
        imageUrl: 'https://images.unsplash.com/photo-1553909489-cd47e0907910?q=80&w=1920&auto=format&fit=crop',
        source: 'Dummy Data Generator',
        tags: ['sandwich', 'lunch'],
        allergens: ['gluten', 'eggs'],
        dietaryFlags: ['high_protein'],
        isSafeForDiabetics: false,
        isSafeDuringPregnancy: true,
        safetyScore: 70,
        userNotes: 'A classic chicken salad sandwich on whole wheat.'
    },
    {
        name: 'Vegan Lentil Soup',
        barcode: '000000000002',
        ingredients: ['Lentils', 'Vegetable Broth', 'Carrots', 'Celery', 'Onion', 'Garlic', 'Olive Oil', 'Turmeric', 'Cumin', 'Salt', 'Pepper'],
        imageUrl: 'https://images.unsplash.com/photo-1593253799390-997930244953?q=80&w=1920&auto=format&fit=crop',
        source: 'Dummy Data Generator',
        tags: ['soup', 'vegan', 'healthy'],
        allergens: [],
        dietaryFlags: ['vegan', 'gluten_free', 'high_fiber', 'low_fat'],
        isSafeForDiabetics: true,
        isSafeDuringPregnancy: true,
        safetyScore: 95,
        userNotes: 'Hearty and healthy vegan lentil soup, packed with vegetables.'
    },
    {
        name: 'Spicy Mango Salsa',
        barcode: '000000000003',
        ingredients: ['Mango', 'Red Onion', 'Jalapeno', 'Cilantro', 'Lime Juice', 'Salt'],
        imageUrl: 'https://images.unsplash.com/photo-1600699805908-355a60a71087?q=80&w=1920&auto=format&fit=crop',
        source: 'Dummy Data Generator',
        tags: ['salsa', 'snack', 'spicy', 'vegan'],
        allergens: [],
        dietaryFlags: ['vegan', 'gluten_free', 'low_fat', 'paleo'],
        isSafeForDiabetics: true, // in moderation
        isSafeDuringPregnancy: true,
        safetyScore: 90,
        userNotes: 'Sweet and spicy mango salsa, perfect with chips or as a topping.'
    },
    {
        name: 'Chocolate Chip Cookies (Pack of 6)',
        barcode: '000000000004',
        ingredients: ['Wheat Flour', 'Chocolate Chips', 'Butter', 'Sugar', 'Brown Sugar', 'Eggs', 'Vanilla Extract', 'Baking Soda', 'Salt'],
        imageUrl: 'https://images.unsplash.com/photo-1593253799390-997930244953?q=80&w=1920&auto=format&fit=crop', // Placeholder, update if needed
        source: 'Dummy Data Generator',
        tags: ['cookies', 'dessert', 'snack'],
        allergens: ['gluten', 'dairy', 'eggs'],
        dietaryFlags: ['vegetarian'],
        isSafeForDiabetics: false,
        isSafeDuringPregnancy: true, // in moderation
        safetyScore: 40,
        userNotes: 'Classic homemade-style chocolate chip cookies.'
    }
];
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var mongoUri, _i, dummyFoodItems_1, item, existingItem, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mongoUri = process.env.MONGODB_URI;
                    if (!mongoUri) {
                        console.error('Error: MONGODB_URI is not defined in your .env file.');
                        process.exit(1);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, 10, 12]);
                    return [4 /*yield*/, mongoose_1.default.connect(mongoUri)];
                case 2:
                    _a.sent();
                    console.log('Successfully connected to MongoDB.');
                    // Optional: Clear existing data (use with caution!)
                    // console.log('Clearing existing food items...');
                    // await FoodItemModel.deleteMany({});
                    // console.log('Existing food items cleared.');
                    console.log('Inserting dummy food items...');
                    _i = 0, dummyFoodItems_1 = dummyFoodItems;
                    _a.label = 3;
                case 3:
                    if (!(_i < dummyFoodItems_1.length)) return [3 /*break*/, 8];
                    item = dummyFoodItems_1[_i];
                    return [4 /*yield*/, FoodItem_1.default.findOne({ barcode: item.barcode })];
                case 4:
                    existingItem = _a.sent();
                    if (!existingItem) return [3 /*break*/, 5];
                    console.log("Food item with barcode ".concat(item.barcode, " (").concat(item.name, ") already exists. Skipping."));
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, FoodItem_1.default.create(item)];
                case 6:
                    _a.sent();
                    console.log("Inserted: ".concat(item.name, " (Barcode: ").concat(item.barcode, ")"));
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8:
                    console.log('Dummy food items inserted successfully.');
                    return [3 /*break*/, 12];
                case 9:
                    error_1 = _a.sent();
                    console.error('Error seeding database:', error_1);
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 11:
                    _a.sent();
                    console.log('Disconnected from MongoDB.');
                    return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
seedDatabase();
