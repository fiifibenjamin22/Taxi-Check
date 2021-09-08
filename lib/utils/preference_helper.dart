import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

class PreferenceHelper {
  static SharedPreferences? _prefs;

  static initPrefs() async {
    if (_prefs == null) _prefs = await SharedPreferences.getInstance();

    // _prefs!.clear();
  }

  static List<Map<String, dynamic>> getJsonList(String key) {
    return List<Map<String, dynamic>>.from(
      jsonDecode(_prefs!.getString(key) ?? '[]'),
    );
  }

  static Map<String, dynamic> getJsonMap(String key) {
    return Map<String, dynamic>.from(jsonDecode(_prefs!.getString(key) ?? '{}'));
  }

  static void saveJson(String key, List<Map<String, dynamic>> json) {
    _prefs!.setString(key, jsonEncode(json));
  }

  static void saveJsonMap(String key, Map<String, dynamic> json) {
    _prefs!.setString(key, jsonEncode(json));
  }
}
