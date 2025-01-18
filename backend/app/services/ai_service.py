import pandas as pd
from sklearn.ensemble import RandomForestRegressor

class NetworkOptimizer:
    def __init__(self):
        self.model = RandomForestRegressor()

    def predict_peak_usage(self, historical_data):
        df = pd.DataFrame(historical_data)
        features = df[['time_of_day', 'day_of_week', 'active_users']]
        predictions = self.model.predict(features)
        return predictions