import 'package:customer_app/presentation/view/main/complaint_screen.dart';
import 'package:customer_app/presentation/viewutils/theme/app_colors.dart';
import 'package:flutter/material.dart';

class AppDialog {
  static Future<void> showDriverNotFoundDialog(
    BuildContext context,
    GlobalKey key,
  ) async {
    return showModalBottomSheet<void>(
      context: context,
      isDismissible: false,
      builder: (BuildContext dialogContext) {
        return new WillPopScope(
          onWillPop: () async => false,
          child: Container(
            key: key,
            padding: EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Driver not found',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            'Driver does not exist in our database.',
                            style: TextStyle(color: Colors.grey),
                          )
                        ],
                      ),
                    ),
                    IconButton(
                      onPressed: () => closeDialog(key),
                      icon: Icon(Icons.close),
                    )
                  ],
                ),
                SizedBox(height: 20),
                TextButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, ComplaintScreen.id),
                  child: Text(
                    'REPORT DRIVER',
                    style: TextStyle(color: Colors.black),
                  ),
                  style: TextButton.styleFrom(
                    backgroundColor: AppColors.primaryColor,
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 15),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  static Future<void> showLoadingDialog(
    BuildContext context,
    GlobalKey key,
  ) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return new WillPopScope(
          onWillPop: () async => false,
          child: SimpleDialog(
            key: key,
            backgroundColor: AppColors.lighterYellow,
            children: <Widget>[
              Center(
                child: Column(
                  children: [
                    CircularProgressIndicator(
                      valueColor: AlwaysStoppedAnimation<Color>(
                        AppColors.primaryColor,
                      ),
                    ),
                    SizedBox(height: 10),
                    Text(
                      "Verifying",
                      style: TextStyle(color: AppColors.primaryColor),
                    )
                  ],
                ),
              )
            ],
          ),
        );
      },
    );
  }

  static Future<void> showErrorDialog(
    BuildContext context,
    GlobalKey key,
    String message,
  ) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return new WillPopScope(
          onWillPop: () async => false,
          child: Dialog(
            key: key,
            backgroundColor: AppColors.lighterYellow,
            child: Wrap(
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(10, 0, 10, 20),
                  child: Column(
                    children: [
                      Align(
                        child: IconButton(
                          onPressed: () => closeDialog(key),
                          icon: Icon(Icons.close),
                        ),
                        alignment: Alignment.topRight,
                      ),
                      Icon(Icons.error, size: 60, color: AppColors.darkGrey),
                      SizedBox(height: 10),
                      Text(
                        message,
                        style: TextStyle(
                          color: AppColors.primaryColor,
                          fontSize: 18,
                        ),
                      ),
                      SizedBox(height: 20),
                    ],
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }

  static Future<void> showDriverReportedDialog(
    BuildContext context,
    GlobalKey key,
  ) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return new WillPopScope(
          onWillPop: () async => false,
          child: Dialog(
            key: key,
            backgroundColor: AppColors.lighterYellow,
            child: Wrap(
              children: [
                Padding(
                  padding: EdgeInsets.fromLTRB(10, 20, 10, 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Icon(
                        Icons.check_circle_outline_rounded,
                        size: 80,
                        color: Colors.green,
                      ),
                      SizedBox(height: 10),
                      Text(
                        "Driver reported. We will update you while we take action.",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: AppColors.primaryColor,
                          fontSize: 18,
                        ),
                      ),
                      SizedBox(height: 20),
                      TextButton(
                        onPressed: () {
                          Navigator.popUntil(context, (route) => route.isFirst);
                        },
                        child: Text(
                          'Okay!',
                          style: TextStyle(color: Colors.black),
                        ),
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.symmetric(vertical: 15),
                          backgroundColor: AppColors.primaryColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                        ),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        );
      },
    );
  }

  static void closeDialog(keyLoader) {
    Navigator.of(keyLoader.currentContext, rootNavigator: true).pop();
  }
}
