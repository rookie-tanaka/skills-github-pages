// actix-webクレート（ライブラリ）から、Webアプリケーションを構築するために必要な部品をインポートします。
// - `get`, `post`: HTTPのGETリクエスト、POSTリクエストを処理する関数を簡単に作るためのマクロです。
// - `web`: ルーティング（URLの振り分け）などで使われるユーティリティが含まれています。
// - `App`: Webアプリケーションそのものです。ここにルートやサービスを登録していきます。
// - `HttpResponse`: クライアントに返すHTTPレスポンスを作成するためのものです。
// - `HttpServer`: 実際にリクエストを待ち受けるHTTPサーバーです。
// - `Responder`: レスポンスとして返せる型であることを示すためのトレイト（インターフェースのようなもの）です。
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use actix_web::http::header::ContentType;

// `#[get("/")]` はactix-webのマクロで、この関数がルートURL ("/") へのGETリクエストを処理することを示します。
// ブラウザで http://127.0.0.1:8080/ にアクセスすると、この関数が呼び出されます。
#[get("/")]
async fn hello() -> impl Responder {
    // `HttpResponse::Ok()` でHTTPステータスコード`200 OK`（成功）のレスポンスを作成し、
    // `.body()` でレスポンスの本文（ボディ）に "Hello world!" という文字列を設定します。
    HttpResponse::Ok().body("Hello world!")
}

// `#[post("/echo")]` は、この関数が "/echo" というパスへのPOSTリクエストを処理することを示します。
#[post("/echo")]
async fn echo(req_body: String) -> impl Responder {
    // 引数の `req_body: String` は「エクストラクタ」と呼ばれ、リクエストのボディ部分を自動的に読み取って
    // String型の変数 `req_body` に格納してくれます。
    // 受け取ったリクエストボディを、そのままレスポンスボディとして返します（やまびこ）。
    HttpResponse::Ok().body(req_body)
}

// こちらはマクロを使わずに定義したリクエストハンドラ関数です。
// このような関数は、後で `.route()` を使って手動でパスに割り当てる必要があります。
async fn manual_hello() -> impl Responder {
    HttpResponse::Ok().body("Hey there!")
}

async fn manual_test() -> impl Responder {
    HttpResponse::Ok()
        .content_type(ContentType::html())
        .body("こんにちはRust！")
}

// `#[actix_web::main]` は、actix-webの非同期ランタイムをセットアップするためのマクロです。
// これにより、`async fn main()` が正しく動作します。
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // `HttpServer::new()` で新しいHTTPサーバーのインスタンスを作成します。
    // `|| { ... }` の部分はクロージャ（無名関数）で、サーバーが内部で起動する
    // ワーカーごとにアプリケーションの状態をコピーするために使われます。
    HttpServer::new(|| {
        // `App::new()` でアプリケーションのインスタンスを作成します。
        App::new()
            // `.service()` を使って、マクロで定義した `hello` 関数をサービスとして登録します。
            .service(hello)
            // 同様に `echo` 関数も登録します。
            .service(echo)
            // `.route()` を使うと、パスとHTTPメソッド、そしてそれを処理する関数を手動で紐付けることができます。
            // ここでは "/hey" へのGETリクエストを `manual_hello` 関数に割り当てています。
            .route("/hey", web::get().to(manual_hello))
            .route("/rust", web::get().to(manual_test))

    })
        // `.bind()` でサーバーが待ち受けるIPアドレスとポート番号を指定します。
        // "127.0.0.1" はローカルホストを意味します。
        // `?` は、もしこのアドレスとポートが使用中でバインドに失敗した場合にエラーを返すための記法です。
        .bind(("127.0.0.1", 8080))?
        // `.run()` でサーバーを起動します。
        .run()
        // `.await` でサーバーが終了するまで（通常はCtrl+Cなどで停止されるまで）非同期に待ち受けます。
        .await
}