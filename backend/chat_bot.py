import json
import numpy as np
import random
import nltk; nltk.download('punkt_tab')
import pickle
from tensorflow.keras.models import load_model
from nltk.stem import WordNetLemmatizer
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam

# Load JSON file
with open(r'C:\Users\abdul\OneDrive\Desktop\project_accomodation\backend\intents.json') as file:
    data = json.load(file)

# Initialize NLP tools
lemmatizer = WordNetLemmatizer()
words = []
classes = []
documents = []
ignore_chars = ['?', '!', '.', ',']

# Process each pattern
for intent in data["intents"]:
    for pattern in intent["patterns"]:
        word_list = nltk.word_tokenize(pattern)
        words.extend(word_list)
        documents.append((word_list, intent["tag"]))
    
    if intent["tag"] not in classes:
        classes.append(intent["tag"])

words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_chars]
words = sorted(set(words))
classes = sorted(set(classes))

print("Words:", words)
print("Classes:", classes)
training = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(w.lower()) for w in word_patterns]
    
    for w in words:
        bag.append(1) if w in word_patterns else bag.append(0)
    
    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])

# Shuffle and convert to array
random.shuffle(training)
training = np.array(training, dtype=object)

X_train = np.array(list(training[:, 0]))
y_train = np.array(list(training[:, 1]))

print("Training Data Shape:", X_train.shape, y_train.shape)
# Define model
model = Sequential([
    Dense(128, input_shape=(len(X_train[0]),), activation='relu'),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(len(classes), activation='softmax')
])

# Compile model
model.compile(loss='categorical_crossentropy', optimizer=Adam(learning_rate=0.01), metrics=['accuracy'])

# Train model
model.fit(X_train, y_train, epochs=200, batch_size=5, verbose=1)

# Save model
model.save("chatbot_model.h5")
# Load trained model
model = load_model("chatbot_model.h5")

# Save words and classes
pickle.dump(words, open("words.pkl", "wb"))
pickle.dump(classes, open("classes.pkl", "wb"))

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence):
    bag_of_words = bow(sentence, words)
    res = model.predict(np.array([bag_of_words]))[0]
    error_threshold = 0.25  # Confidence threshold
    results = [[i, r] for i, r in enumerate(res) if r > error_threshold]

    results.sort(key=lambda x: x[1], reverse=True)
    return [{"intent": classes[r[0]], "probability": str(r[1])} for r in results]

def get_response(intents_list, intents_json):
    tag = intents_list[0]['intent']
    for i in intents_json['intents']:
        if i['tag'] == tag:
            return random.choice(i['responses'])

def chatbot_response(message):
    intents = predict_class(message)
    return get_response(intents, data)

# Test chatbot
print(chatbot_response("I want to rent a house"))
