import 'package:chopper/chopper.dart';
import 'package:customer_app/domain/interceptors/api_exceptions_interceptor.dart';
import 'package:customer_app/utils/strings.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

part 'api_service.chopper.dart';

@ChopperApi()
abstract class ApiService extends ChopperService {

  @Post(path: '/auth/phoneAuth')
  Future<Response> verifyPhone(@Body() Map<String, dynamic> params);

  @Post(path: '/auth/confirmOTP')
  Future<Response> confirmOTP(@Body() Map<String, dynamic> params);

  @Post(path: '/complaints/create')
  Future<Response> reportDriver(@Body() Map<String, dynamic> params);

  @Get(path: '/vehicle/findByNumberPlate/{numberPlate}')
  Future<Response> verifyVehicle(@Path("numberPlate") numberPlate);

  @Get(path: '/complaints/all/by/{userId}')
  Future<Response> activities(@Path("userId") userId);

  static ApiService create() {
    final client = ChopperClient(
      baseUrl: Strings.BASE_API_URL,
      services: [_$ApiService()],
      converter: JsonConverter(),
      interceptors: [
        HeadersInterceptor({'Cache-Control': 'no-cache'}),
        HttpLoggingInterceptor(),
        ApiExceptionsInterceptor(),
      ],
    );
    return _$ApiService(client);
  }

  static final apiServiceProvider = Provider((ref) => ApiService.create());
}

