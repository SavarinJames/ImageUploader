from flask import Flask, request, send_file, jsonify
from PIL import Image
from base64 import encodebytes
import io
import os
import cv2
import json

app = Flask(__name__)
command = 'python fast_neural_style/neural_style/neural_style.py eval --content-image {} --model {} --output-image {} --cuda 0'
dirs_model = ['fast_neural_style/saved_models/blame.model',
              'fast_neural_style/saved_models/yuumei.model',
              'fast_neural_style/saved_models/candy.pth',
              'fast_neural_style/saved_models/mosaic.pth',
              'fast_neural_style/saved_models/rain_princess.pth',
              'fast_neural_style/saved_models/udnie.pth']
output_image_dir = 'fast_neural_style/images/output-images'
input_image_dir = 'fast_neural_style/images/content-images'

def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img


@app.route('/encode/style_transfer', methods=['POST', 'GET'])
def style_transer_encode_all():
    if request.method == 'POST':
        file = request.files['file']
        input_image = f'{input_image_dir}/{file.filename}'
        file.save(input_image)

        paths= []
        for model in dirs_model[2:]:
            model_names = model.split('/')[-1]
            out_img_path = f'{output_image_dir}/{file.filename[:-4]}_{model_names[:-4]}.png'
            paths.append(out_img_path)
            os.system(command.format(input_image, model, out_img_path))  
        os.remove(input_image)
        encoded_imges = []
        for img_path in paths:
            encoded_imges.append(get_response_image(img_path))
            os.remove(img_path)
        return jsonify({'result': encoded_imges})
    return "HMMMM"

@app.route('/origin/blame', methods=['POST', 'GET'])
def style_transfer_blame():
    if request.method == 'POST':
        print('[INFO] go jere')
        file = request.files['file']
        input_image = f'{input_image_dir}/{file.filename}'
        file.save(input_image)
        model = dirs_model[0]
        model_names = model.split('/')[-1]
        out_img_path = f'{output_image_dir}/{file.filename[:-4]}_{model_names[:-4]}.png'
        os.system(command.format(input_image, model, out_img_path))
        os.remove(input_image)
        return send_file(out_img_path)
    return 'Not defined'

@app.route('/origin/yuumei', methods=['POST', 'GET'])
def style_transfer_yuumei():
    if request.method == 'POST':
        print('[INFO] go jere')
        file = request.files['file']
        input_image = f'{input_image_dir}/{file.filename}'
        file.save(input_image)
        model = dirs_model[1]
        model_names = model.split('/')[-1]
        out_img_path = f'{output_image_dir}/{file.filename[:-4]}_{model_names[:-4]}.png'
        os.system(command.format(input_image, model, out_img_path))
        os.remove(input_image)
        return send_file(out_img_path)
    return 'Not defined'

@app.route('/origin/candy', methods=['POST', 'GET'])
def style_transfer_candy():
    if request.method == 'POST':
        print('[INFO] go jere')
        file = request.files['file']
        input_image = f'{input_image_dir}/{file.filename}'
        file.save(input_image)
        model = dirs_model[2]
        model_names = model.split('/')[-1]
        out_img_path = f'{output_image_dir}/{file.filename[:-4]}_{model_names[:-4]}.png'
        os.system(command.format(input_image, model, out_img_path))
        os.remove(input_image)
        return send_file(out_img_path)
    return 'Not defined'

@app.route('/origin/mosaic', methods=['POST', 'GET'])
def style_transfer_mosaic():
    if request.method == 'POST':
        print('[INFO] go jere')
        file = request.files['file']
        input_image = f'{input_image_dir}/{file.filename}'
        file.save(input_image)
        model = dirs_model[3]
        model_names = model.split('/')[-1]
        out_img_path = f'{output_image_dir}/{file.filename[:-4]}_{model_names[:-4]}.png'
        os.system(command.format(input_image, model, out_img_path))
        os.remove(input_image)
        return send_file(out_img_path)
    return 'Not defined'
# @app.route('/tmp/a')
# def t():
#     return ">>>>"

@app.route('/')
def root():
    value = {
        "name" : "Tao",
        "action": "ky",
        "object": "nguc fan, 2k3, 2 em Tay"
    }
    return json.dumps(value)
