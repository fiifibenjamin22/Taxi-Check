import 'package:customer_app/presentation/viewutils/routing.dart';
import 'package:customer_app/presentation/viewutils/theme/app_theme.dart';
import 'package:customer_app/utils/preference_helper.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:logging/logging.dart';

void main() async {
  await _preLoader();
  runApp(MyApp());
}

Future<void> _preLoader() async {
  WidgetsFlutterBinding.ensureInitialized();
  _initLogger();
  await PreferenceHelper.initPrefs();
}

void _initLogger() {
  Logger.root.level = Level.ALL;
  Logger.root.onRecord.listen((rec) {
    print("${rec.level.name}: ${rec.time}: ${rec.message}");
  });
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ProviderScope(
      child: MaterialApp(
        title: 'Taxi Check',
        debugShowCheckedModeBanner: false,
        darkTheme: AppTheme.darkTheme,
        theme: AppTheme.lightTheme,
        routes: Routing.routes,
        initialRoute: Routing.initialRoute,
      ),
    );
  }
}
