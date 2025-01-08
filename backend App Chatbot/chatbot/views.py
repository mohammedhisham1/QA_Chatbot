import pickle
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

MODEL_PATH =('./model/faq_model.pkl')
VECTORIZER_PATH = ('./model/faq_vectorizer.pkl')


with open(MODEL_PATH, 'rb') as model_file:
    model = pickle.load(model_file)

with open(VECTORIZER_PATH, 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

@csrf_exempt
def ChatbotAPI(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('message', '').strip()
        # user_input = request.POST.get('message', '')
        if not user_input:
            return JsonResponse({'response': 'Please provide a message.'})
                
        user_input_processed = user_input
        user_input_vectorized = vectorizer.transform([user_input_processed])
        response = model.predict(user_input_vectorized)[0]

        return JsonResponse({'response': response})
    else:
        return JsonResponse({'error': 'Invalid request method.'})




# import pandas as pd
# import json
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from fuzzywuzzy import process


# DATASET_PATH = r"C:\Users\Mohammed Hesham\Desktop\chat bot\dataset.csv"
# faq_data = pd.read_csv(DATASET_PATH)


# def get_answer_from_dataset(question):
#     best_match = process.extractOne(question, faq_data['question'])
#     if best_match and best_match[1] > 70:  
#         matched_row = faq_data[faq_data['question'] == best_match[0]]
#         return matched_row.iloc[0]['answer']
#     else:
#         return "Sorry, I couldn't find an answer to your question."

# @csrf_exempt
# def ChatbotAPI(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             user_message = data.get('message', '').strip()
#             print(f"Message received: {user_message}") 

#             if not user_message:
#                 return JsonResponse({'response': 'Please provide a message.'})
            
#             response = get_answer_from_dataset(user_message)
#             return JsonResponse({'response': response})
#         except json.JSONDecodeError:
#             return JsonResponse({'error': 'Invalid JSON format.'})
#     else:
#         return JsonResponse({'error': 'Invalid request method.'})
