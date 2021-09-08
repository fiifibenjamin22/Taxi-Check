import 'package:customer_app/data/datasource/local/auth_local_data_source.dart';
import 'package:flutter/foundation.dart';

class Strings {
  static const ImagePath = 'assets/images/';
  static const BASE_API_URL = kReleaseMode
      ? "https://live-taxi-check-api.herokuapp.com/api"
      : "http://0.0.0.0:3000/api";
  //"https://taxi-check-engine.herokuapp.com/api";
  static const API_DEFAULT_PAGE_SIZE = 10;
  static const PREFS_AUTH_KEY = 'USER';
  static const PREFS_APP_INFO_KEY = 'APP_INFO';
  static const USER_GROUP = '6093dc55d1138b0015253f90';
  static const COMPLAINT_STATUS = 'PENDING';
  static const COMPLAINT_TO = '60d087445e3b88a9aa661f01';
  static final userId = AuthLocalDataSource.getUserId();
  static final user = AuthLocalDataSource.getUser();
}
