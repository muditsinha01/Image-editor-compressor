function centroids = kMeansInitCentroids(X, K)
%KMEANSINITCENTROIDS This function initializes K centroids that are to be 
%used in K-Means on the dataset X
%   centroids = KMEANSINITCENTROIDS(X, K) returns K initial centroids to be
%   used with the K-Means on the dataset X
%

% You should return this values correctly
centroids = zeros(K, size(X, 2));

% ====================== YOUR CODE HERE ======================
% Instructions: You should set centroids to randomly chosen examples from
%               the dataset X
%
%Choosing a random index from training set 
randidx = randperm(size(X, 1));
% Assigning a random training set example to Centroid, later through optimization we will get the actual centroid
centroids = X(randidx(1:K), :);







% =============================================================

end

