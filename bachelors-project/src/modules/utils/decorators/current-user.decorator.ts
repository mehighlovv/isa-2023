import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        let request={headers: { authorization: "" } };
        if(ctx["contextType"] == "http"){
            request = ctx.switchToHttp().getRequest();
        }else{
            const { req } = ctx.getArgs()[2]; // Access the GraphQL context's req property
            request = req;
        }
        const user = request["user"];
        return user;
    }
);
