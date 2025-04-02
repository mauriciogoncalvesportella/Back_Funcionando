import { Global, Module } from '@nestjs/common';
import { SocketStateModule } from './socket-state/socket-state.module';
import { WebsocketGateway } from './websocket.gateway';

@Global()
@Module({
  imports: [SocketStateModule],
  exports: [SocketStateModule, WebsocketGateway],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
