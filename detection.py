import pandas as pd
from pandas.io.json import json_normalize
import csv
import os
import base64
import sys
import json
import pickle
import cv2
import numpy as np

def detect_object(uploaded_image_path,UPLOAD_FOLDER):
    # Loading image
    if uploaded_image_path is None:
        return "none"
    
    img = cv2.imread(uploaded_image_path)
 
    # Load Yolo
    # yolo_weight = "./detections/yolov3.weights"
    yolo_weight = "./detections/yolov3-tiny.weights"
    # yolo_config = "./detections/data/cfg/yolov3.cfg"
    yolo_config = "./detections/data/cfg/yolov3-tiny.cfg"
    coco_labels = "./detections/data/coco.names"
    net = cv2.dnn.readNet(yolo_weight,yolo_config)
    classes = []
    with open(coco_labels, "r") as f:
        classes = [line.strip() for line in f.readlines()]
    
    # Defining desired shape
    fWidth = 320
    fHeight = 320
    
    # Resize image in lib openCv
    img = cv2.resize(img, (fWidth, fHeight))
    
    height, width, channels = img.shape
    
    # Convert image to Blob
    blob = cv2.dnn.blobFromImage(img, 1 / 255, (fWidth, fHeight), (0, 0, 0), True, crop=False)
    # Set input for yolo object detection
    net.setInput(blob)
    
    # Find names of all layers
    layer_names = net.getLayerNames()
    # print(layer_names)
    
    output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]
    # print(output_layers)
    
    # Send blob data to forward pass
    outs = net.forward(output_layers)
    # print(outs[0].shape)
    # print(outs[1].shape)
    # print(outs[2].shape)
    
    colors = np.random.uniform(0, 255, size=(len(classes), 3))
    
    # Extract information on the screen
    class_ids = []
    confidences = []
    boxes = []
    
    for out in outs:
        for detection in out:
            # Extract score value
            scores = detection[5:]
            # Object id
            class_id = np.argmax(scores)
            # Confidence score for each object ID
            confidence = scores[class_id]
            # if confidence > 0.5 and class_id == 0:
            if confidence > 0.5:
                # Extract values to draw bounding box
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                # Rectangle coordinates
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)
                
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    
    font = cv2.FONT_HERSHEY_COMPLEX_SMALL
    
    for i in range(len(boxes)):
        if i in indexes:
            x, y, w, h = boxes[i]
            label = str(classes[class_ids[i]])
            # label = str(classes[0])
            confidence_label = int(confidences[i] * 100)
            color = colors[i]
            cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
            cv2.putText(img, f'{label, confidence_label}', (x - 25, y + 75), font, 1, color, 2)
    
    # Write output image (object detection output)
    output_image_path = os.path.join(UPLOAD_FOLDER, 'output_image.jpg')
    cv2.imwrite(output_image_path, img)
    
    # return output_image_path
    return output_image_path