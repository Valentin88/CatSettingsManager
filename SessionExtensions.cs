using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace CatApp
{
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, int key, T value)
        {
            session.SetString(key.ToString(), JsonSerializer.Serialize(value));
        }

        public static T? Get<T>(this ISession session, int key)
        {
            var value = session.GetString(key.ToString());
            return value == null ? default : JsonSerializer.Deserialize<T>(value);
        }
    }
}
