<html>
    <head>
        <title>Hacker News</title>
        <link rel='stylesheet' href='/public/css/news.css' />
    </head>
    <body>
        <table border="1">
            <tr>
                <th>type</th>
                <th>times</th>
            </tr>
            
            {% for item in list %}
            <tr>
                <td>{{ item.type }}</td>
                <td>{{ item.times }}</td>
            </tr>
            {% endfor %}
            
        </table>
    </body>
    <script src='http://apps.bdimg.com/libs/jquery/2.1.4/jquery.js'> </script>
</html>