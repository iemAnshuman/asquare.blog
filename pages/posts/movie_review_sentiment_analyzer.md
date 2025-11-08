---
title: Movie review sentiment analyser
date: 2025-08-11
type: post
---

## **Movie review sentiment analyser**

### **Problem**

given a dataset of movies reviews in paragraphs format,
our goal is to create a model that can convert those reviews
into just "good" or "bad". These type of models are called
classifcation models, because we are trying to classify

### **Approach**

1. download the dataset (we can use apis and scrappers
   but for simplicity we will stick to kaggle dataset)

   we assume that our data is preprocessed, in my case it is.

2. we now have dataset of reviews. for each review, we will
   tokenise the paragraph into words. because our model will take
   tokens (words here) and generate "good" or "bad" tag for each
3. we now have a set of words instead of paragraphs.
   these set contains some useless words too that doesn't contribute
   to finding whether the review is "good" or "bad".
   we will remove these useless words or tokens.
4. We now have our dataset ready. We will split this dataset
   into training and testing with test_size being 0.2, that is
   data size ratio for train:train = 8:2
5. Now let's train our model!
   a. using logistic regression:- - linear regression + activation fn - activation fn is either sigmoid if binary or softmax if multi

   b. using multinomial naive bayes:- - utilises bayes theorem - naive cuz it assumes all features are independent of each other

   Model is trained!

6. Let's evaluate our model on our testset.
   what metrics to use for this?
   since we are performing binary classification and assuming:
   the classes are balanced, false postivites,
   and false negatives are not expensive too.
   therefore, accuracy is the best measure here.

   -> LogisticRegression outperformed Multinomial NB here

7. We can also save this model from RAM to local storage:
   ```py
   joblib.dump(model,"my_model.pkl")
   model = joblib.load("my_model.pkl") # load again
   ```
   won't be doing this cuz don't want to store this stupid model

---

#### links

github: https://github.com/iemAnshuman/AI-Projects/blob/main/movie_review_sentiment_analysis.ipynb
