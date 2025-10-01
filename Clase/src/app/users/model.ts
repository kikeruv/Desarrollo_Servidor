import {model, Schema, SchemaTypes} from 'mongoose';

const userSchema = new Schema({
    name: {
        type: SchemaTypes.String,
        require: true
    },
    email: {
        type: SchemaTypes.String,
        require: true,
        unique: true
    }
});

const user = model('user', userSchema)