import 'package:customer_app/utils/preference_helper.dart';
import 'package:customer_app/utils/strings.dart';

class AuthLocalDataSource {
  static void saveUser(Map<String, dynamic> user) =>
      PreferenceHelper.saveJsonMap(Strings.PREFS_AUTH_KEY, user);

  static Map<String, dynamic> getLoggedInUser() =>
      PreferenceHelper.getJsonMap(Strings.PREFS_AUTH_KEY);

  static String getUserId() => getLoggedInUser()['_id'];

  static String getUser() => getLoggedInUser()['username'];
}
