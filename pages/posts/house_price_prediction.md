---
title: house price prediction (intermediate)
date: 2025-08-11
type: post
---

## **Project Title**

### **Problem**

create a professional-style regression system.

### **Approach**

1. download the dataset.
   dataset I used: https://www.kaggle.com/datasets/ashydv/housing-dataset
2. Data-preprocessing:
   a. check for null values (in this case there is none)
   b. convert categorical values into numerical ones using one hot encoding
   c.
3. ohhhh shit! I had to create a pipeline for this...;
   let's switch from .ipynb to .py to build this.
4. in the main(), import dataset and call:
   - preprocessor: seperate piplines for both numeric and
     categorical data.
     numeric -> impute and scale
     categorical -> impute and one-hot encoding
5. after preprocessing, create a baseline model using LinearRegression.
6. find the mean of root mean squared error for 5 folds.

   We have created a baseline model!

7. now let's build a random tree regressor to compare our baseline mdoel with.

8. We will utilise GridSearchCV for choosing hyperparameter. give a list of wild guesses.

9. run the results and save it in .md format.

10. save the better model

### **Full Repo / Notebook**

Link to GitHub or colab.

---
